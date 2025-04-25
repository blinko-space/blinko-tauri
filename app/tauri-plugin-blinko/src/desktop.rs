use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(
  app: &AppHandle<R>,
  _api: PluginApi<R, C>,
) -> crate::Result<Blinko<R>> {
  Ok(Blinko(app.clone()))
}

/// Access to the blinko APIs.
pub struct Blinko<R: Runtime>(AppHandle<R>);

impl<R: Runtime> Blinko<R> {
  pub fn setcolor(&self, payload: SetColorRequest) -> crate::Result<()> {
    Ok(())
  }
}
