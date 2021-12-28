pipeline {
    agent { 
      docker { 
        image 'node/stretch:latest' 
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