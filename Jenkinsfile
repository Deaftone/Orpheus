pipeline {
    agent { docker { image 'cimg/rust:1.57.0-node' args '-u jenkins' } }
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