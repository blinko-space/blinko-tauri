package com.plugin.blinko

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.util.Log
import android.view.View
import android.view.WindowInsetsController

class Blinko {
    fun setcolor(hex: String, activity: Activity) {
        val color = Color.parseColor(hex)
        
        activity.window.statusBarColor = color
        activity.window.navigationBarColor = color 

        val isLightColor = isColorLight(color)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val statusAppearance = if (isLightColor) {
                WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
            } else {
                0
            }
            
            val navAppearance = if (isLightColor) {
                WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
            } else {
                0
            }
            
            activity.window.insetsController?.setSystemBarsAppearance(
                statusAppearance, 
                WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
            )
            
            activity.window.insetsController?.setSystemBarsAppearance(
                navAppearance,
                WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
            )
            
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            var flags = 0
            
            if (isLightColor) {
                flags = flags or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
            }
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && isLightColor) {
                flags = flags or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
            }
            
            @Suppress("DEPRECATION")
            activity.window.decorView.systemUiVisibility = flags
        }
    }

    private fun isColorLight(color: Int): Boolean {
        val red = Color.red(color)
        val green = Color.green(color)
        val blue = Color.blue(color)
        val brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255
        return brightness > 0.5
    }
}
