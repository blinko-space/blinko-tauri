use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Blinko;
#[cfg(mobile)]
use mobile::Blinko;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the blinko APIs.
pub trait BlinkoExt<R: Runtime> {
  fn blinko(&self) -> &Blinko<R>;
}

impl<R: Runtime, T: Manager<R>> crate::BlinkoExt<R> for T {
  fn blinko(&self) -> &Blinko<R> {
    self.state::<Blinko<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("blinko")
    .invoke_handler(tauri::generate_handler![commands::setcolor])
    .setup(|app, api| {
      #[cfg(mobile)]
      let blinko = mobile::init(app, api)?;
      #[cfg(desktop)]
      let blinko = desktop::init(app, api)?;
      app.manage(blinko);
      Ok(())
    })
    .build()
}
