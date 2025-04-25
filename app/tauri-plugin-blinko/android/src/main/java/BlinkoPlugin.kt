package com.plugin.blinko

import android.app.Activity
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import app.tauri.plugin.Invoke

@InvokeArg
class PingArgs {
  var value: String? = null
}

@TauriPlugin
class BlinkoPlugin(private val activity: Activity): Plugin(activity) {
    private val implementation = Blinko()

    @Command
    fun setColor(invoke: Invoke) {
        val args = invoke.parseArgs(SetColorArgs::class.java)
        implementation.setColor(args.hex, activity)
        invoke.resolve()
    }
}
