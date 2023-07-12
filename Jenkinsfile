@Library(value='ci-cd', changelog=false) _

def general_notification = new org.general.notification()
def repoName = "${env.BRANCH_NAME}-wochit-embedded"

pipeline {
  options
  {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '3'))
  }
  agent {
    kubernetes {
      label "jenkins-slave-${repoName}"
      defaultContainer 'node'
      yaml """
metadata:
  namespace: ci-cd-tools
  labels:
    some-label: some-label-value
spec:
  nodeSelector:
    nodegroup-type: cicd-workloads
  containers:
  - name: kubectl-aws-iam-authenticator
    image: tools-docker-registry.wochit.com/kubectl-aws-iam-authenticator:secrets
    args:
    - /bin/sh
    - -c
    - sh /tmp/kubectl.sh && cat
    tty: true
    volumeMounts:
      - name: aws-account-credentials
        mountPath: /root/.aws/credentials
        subPath: credentials
      - name: aws-account-config
        mountPath: /root/.aws/config
        subPath: config
  - name: node
    image: tools-docker-registry.wochit.com/node-chrome:latest
    command:
      - /bin/sh
      - -ec
      - |
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        cat
    tty: true
    envFrom:
      - secretRef:
          name: npm-repo
    volumeMounts:
      - name: ssh-key-volume
        mountPath: "/root/.ssh/id_rsa"
        subPath: id_rsa
  volumes:
  - name: aws-account-credentials
    secret:
      secretName: aws-account-credentials
  - name: aws-account-config
    secret:
      secretName: aws-account-config
      defaultMode: 511
  - name: ssh-key-volume
    secret:
      secretName: devops-ssh-key
      defaultMode: 256
"""
    }
  }
  parameters
  {
    booleanParam(name: 'publishToNpm', defaultValue: false, description: 'Publish NPM module')
    booleanParam(name: 'publishDocs', defaultValue: false, description: 'Publish Documentation')
    booleanParam(name: 'publishToS3', defaultValue: false, description: 'Publish S3-CDN IIFE snippet')
  }
  stages
  {
    stage('Build')
    {
      steps
      {
        script
        {
          sh """
          npm config set cache ./.npm --global
          npm config set unsafe-perm true
          mkdir node_modules
          chown node:node node_modules
          npm ci --no-audit
          """

          if(!params.publishDocs || params.publishToS3 || params.publishToNpm)
          {
            sh "npm run build:all"
          }
        }
      }
    }
    stage('NPM')
    {
      when { expression { params.publishToNpm } }
      steps
      {
        script
        {
          sh "npm publish"
        }
      }
    }
    stage('Docs')
    {
      when { expression { params.publishDocs } }
      steps
      {
        script
        {
          sh """
          npm run build:docs
          cd docs/.vuepress/dist
          echo 'docs.wochit.com' > CNAME

          git config --global user.name "wochit-devops"
          git config --global user.email "devops@wochit.com"

          git init
          git add -A
          git commit -m 'deploy'

          git push -f git@github.com:wochit/wochit-embedded.git master:documentation
          """
        }
      }
    }
    stage('S3-CDN')
    {
      when { expression { params.publishToS3 } }
      steps
      {
        container('kubectl-aws-iam-authenticator')
        {
          script
          {
            sh 'pip install boto requests logging s3cmd'

            sh """
            cp ~/.aws/credentials \$HOME/.s3cfg
            sed -i "s/aws_access_key_id/access_key/g" \$HOME/.s3cfg
            sed -i "s/aws_secret_access_key/secret_key/g" \$HOME/.s3cfg
            """

            def jsonObj = readJSON file: 'package.json'
            def version = jsonObj['version']

            sh "s3cmd put dist-snippet/* s3://wochit-embedded/"

            sh "aws cloudfront create-invalidation --distribution-id E1TGV7X7NG6XBN --paths '/*'"
          }
        }
      }
    }
  }
  post { always { script { general_notification.sendSlack() } } }
}
