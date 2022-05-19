@Library(value='ci-cd', changelog=false) _

def general_notification = new org.general.notification()
def repoName = "${env.BRANCH_NAME}-wochit-embedded"

def env = ((env.BRANCH_NAME == 'master') || (env.BRANCH_NAME == 'stage') ? "production" : "development");

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
    image: 10.100.200.251:5000/kubectl-aws-iam-authenticator:secrets
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
    image: 10.100.200.251:5000/node-chrome:latest
    command:
      - /bin/sh
      - -ec
      - |
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        cat
    tty: true
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
    booleanParam(name: 'publishToS3', defaultValue: false, description: '')
    booleanParam(name: 'publishToNpm', defaultValue: false, description: '')
    booleanParam(name: 'publishDocs', defaultValue: false, description: '')
  }
  stages
  {
    stage('Build')
    {
      steps
      {
        sh "npm ci"
      }
    }
    stage('Publish')
    {
      steps
      {
        script
        {
          if(!params.publishDocs)
          {
            sh "npm run build:all"
          }
          if(params.publishDocs)
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
    }
  }
  post { always { script { general_notification.sendSlack() } } }
}
