node {
  stage('Clone repo'){
    checkout scm
  }
  stage('Setup tools'){
    node {
      env.NODEJS_HOME = "${tool 'Node 17.1.0'}"
      // on linux / mac
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
      sh 'npm --version'
    }
  }
  stage('Install deps'){
    sh 'npm install'
  }
  stage('Build app'){
    sh 'npm run build'
  }
}