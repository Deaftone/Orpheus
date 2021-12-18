use tauri_build::{try_build, Attributes, WindowsAttributes};
fn main() {
  if let Err(error) = try_build(Attributes::new().windows_attributes(
    WindowsAttributes::new().sdk_dir("C:/Program Files (x86)/Windows Kits/10/bin/10.0.19041.0/x64/")
  )) {
    panic!("error found during tauri-build: {}", error);
  }
  tauri_build::build()
}
