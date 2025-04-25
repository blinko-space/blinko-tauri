package com.blinko.app

import android.os.Bundle
import android.graphics.Color
import android.view.WindowInsetsController
import android.view.View
import android.os.Build

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }
    
    override fun onResume() {
        super.onResume()
        setWhiteSystemBars()
    }
    
    private fun setWhiteSystemBars() {
        try {
            val whiteColor = Color.WHITE
            
            window.statusBarColor = whiteColor
            window.navigationBarColor = whiteColor
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                window.decorView.post {
                    window.insetsController?.let { controller ->
                        controller.setSystemBarsAppearance(
                            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS,
                            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                        )
                        controller.setSystemBarsAppearance(
                            WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS,
                            WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                        )
                    }
                }
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                // Android 6.0 - 10
                var flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    flags = flags or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                }
                
                @Suppress("DEPRECATION")
                window.decorView.systemUiVisibility = flags
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}