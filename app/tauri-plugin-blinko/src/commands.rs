use tauri::{AppHandle, command, Runtime};

use crate::models::*;
use crate::Result;
use crate::BlinkoExt;

#[command]
pub(crate) async fn setcolor<R: Runtime>(
    app: AppHandle<R>,
    payload: SetColorRequest,
) -> Result<()> {
    app.blinko().setcolor(payload)
}