pipeline {
    agent { 
      docker { 
        image 'cimg/rust:1.57.0-node' 
        } 
      }
      stages {
        stage('Install deps') {
          steps {
            sh 'sudo chown -R 1000:1000 "/.npm"'
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