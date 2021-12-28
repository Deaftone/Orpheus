pipeline {
    agent { 
      docker { 
        image 'node:17-alpine' 
        } 
      }
      stages {
        stage('Install deps') {
          steps {
            sh 'npm install'
          }
        }
        stage('Build app'){
          steps {
            sh 'npm run build'
          }
        }
  }
}