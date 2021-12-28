pipeline {
    agent { docker { image 'cimg/rust:1.57.0-node' } }
      stages {
        stage('log version info') {
      steps {
        sh 'node --version'
        sh 'cargo version'
      }
    }
  }
}