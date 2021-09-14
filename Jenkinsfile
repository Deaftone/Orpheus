pipeline {
  agent any
  stages {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
    stage('Deploy to Prod') {
      when {
        branch 'production'
      }
      steps {
        sh 'echo DEPLOY'
      }
    }
  }
}
