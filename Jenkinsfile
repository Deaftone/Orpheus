pipeline {
    agent { 
      docker { 
        image '112madgamer/jenkins_rust_node:latest' 
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