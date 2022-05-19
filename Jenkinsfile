@Library(value='ci-cd', changelog=false) _

def general_notification = new org.general.notification()
def repoName = "${env.BRANCH_NAME}-wochit-embedded"

def env = ((env.BRANCH_NAME == 'master') || (env.BRANCH_NAME == 'stage') ? "production" : "development");

pipeline {
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
    image: node:16.14-stretch
    command:
    - cat
    tty: true
  volumes:
  - name: aws-account-credentials
    secret:
      secretName: aws-account-credentials
  - name: aws-account-config
    secret:
      secretName: aws-account-config
      defaultMode: 511
"""
    }
  }
  parameters
  {
    booleanParam(name: 'publishToS3', defaultValue: false, description: '')
    booleanParam(name: 'publishToNpm', defaultValue: false, description: '')
  }
  stages
  {
    stage('Build')
    {
      steps
      {
        sh "npm ci && npm run build:all"
      }
    }
    stage('Push') { steps { sh "docker push ${docker_image_name}" } }
  }
  post { always { script { general_notification.sendSlack() } } }
}
