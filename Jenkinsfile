#!/usr/bin/env groovy

pipeline {
  agent { label 'nodejs' }

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Test') {
      steps {
        checkout scm
        sh 'npm install'
        sh 'npm test'
      }
    }
  }
  post {
    changed {
      script {
        if (BRANCH_NAME == 'master') {
          if (currentBuild.currentResult == 'SUCCESS') {
            slackSend(channel: "#ci", color: 'good', message: "Success: ${JOB_NAME} ${BUILD_URL}")
          } else {
            slackSend(channel: "#ci", color: 'danger', message: "Failure: ${JOB_NAME} ${BUILD_URL}")
          }
        }
      }
    }
  }
}
