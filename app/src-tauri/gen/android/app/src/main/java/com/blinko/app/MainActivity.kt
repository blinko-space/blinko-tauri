package com.blinko.app

import android.os.Bundle
import android.graphics.Color
import android.content.res.Configuration
import androidx.core.view.WindowInsetsControllerCompat

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        updateColorsBasedOnTheme()
    }
    
    private fun isDarkTheme(): Boolean {
        return resources.configuration.uiMode and 
                Configuration.UI_MODE_NIGHT_MASK == 
                Configuration.UI_MODE_NIGHT_YES
    }
    
    private fun updateColorsBasedOnTheme() {
        val controller = WindowInsetsControllerCompat(window, window.decorView)
        
        if (isDarkTheme()) {
            window.statusBarColor = Color.BLACK
            window.navigationBarColor = Color.BLACK
            controller.isAppearanceLightStatusBars = false
            controller.isAppearanceLightNavigationBars = false
        } else {
            window.statusBarColor = Color.WHITE
            window.navigationBarColor = Color.WHITE
            controller.isAppearanceLightStatusBars = true
            controller.isAppearanceLightNavigationBars = true
        }
    }
}