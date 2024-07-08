// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[allow(unused)]
use tauri_plugin_system_info::utils::{SysInfo, SysInfoState};
use std::sync::{Arc, Mutex};
use axum::{
    extract::State,
    response::IntoResponse,
    Json,
};
use sysinfo::System;



#[derive(Clone)]
struct AppState{
    sys: Arc<Mutex<System>>,
}
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_system_info::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    // println!("Hello World!!!");
    // let router = Router::new().route("/", get(get_cpus))
    //     .with_state(AppState{
    //         sys:Arc::new(Mutex::new(System::new())),
    //     }
    // );
    // let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    // axum::serve(listener, router).await.unwrap();
    // println!("Listening on {:?}", listener.local_addr()?);

}

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet])
//         .plugin(tauri_plugin_sql::Builder::default().build())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// #[axum::debug_handler]
// async fn get_cpus(State(state): State<AppState>) -> impl IntoResponse {
//     let mut sys = state.sys.lock().unwrap();
//     sys.refresh_cpu();
//     let v: Vec<_> = sys.cpus().iter().map(
//         |cpu| cpu.cpu_usage()
//     ).collect();
//     Json(v)
// }

