use tauri::{AppHandle, command, Runtime};

use crate::models::*;
use crate::Result;
use crate::BlinkoExt;

#[command]
pub(crate) async fn set_color<R: Runtime>(
    app: AppHandle<R>,
    payload: SetColorRequest,
) -> Result<()> {
    app.blinko().set_color(payload)
}