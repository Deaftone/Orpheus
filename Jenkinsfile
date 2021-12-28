node {
  stage('Clone repo'){
    checkout scm
  }
  stage('Install deps'){
    sh 'npm install'
  }
  stage('Build app'){
    sh 'npm run build'
  }
}