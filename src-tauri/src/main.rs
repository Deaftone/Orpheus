#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use tauri::Manager;
use window_shadows::set_shadow;
use tauri_plugin_store::PluginBuilder as store;

// Create the command:
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen

  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

// Register the command:
fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .plugin(store::default().build())
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      set_shadow(&window, true).expect("Unsupported platform!");
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}