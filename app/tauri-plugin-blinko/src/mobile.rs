use serde::de::DeserializeOwned;
use tauri::{
  plugin::{PluginApi, PluginHandle},
  AppHandle, Runtime,
};

use crate::models::*;

#[cfg(target_os = "ios")]
tauri::ios_plugin_binding!(init_plugin_blinko);

// initializes the Kotlin or Swift plugin classes
pub fn init<R: Runtime, C: DeserializeOwned>(
  _app: &AppHandle<R>,
  api: PluginApi<R, C>,
) -> crate::Result<Blinko<R>> {
  #[cfg(target_os = "android")]
  let handle = api.register_android_plugin("com.plugin.blinko", "BlinkoPlugin")?;
  #[cfg(target_os = "ios")]
  let handle = api.register_ios_plugin(init_plugin_blinko)?;
  Ok(Blinko(handle))
}

/// Access to the blinko APIs.
pub struct Blinko<R: Runtime>(PluginHandle<R>);

impl<R: Runtime> Blinko<R> {
  pub fn setcolor(&self, payload: SetColorRequest) -> crate::Result<()> {
    self
      .0
      .run_mobile_plugin("setcolor", payload)
      .map_err(Into::into)
  }
}
