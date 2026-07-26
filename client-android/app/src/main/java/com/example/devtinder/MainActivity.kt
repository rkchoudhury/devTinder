package com.example.devtinder

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.example.devtinder.ui.navigation.AppNavigator
import com.example.devtinder.ui.theme.DevTinderTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            DevTinderTheme {
                AppNavigator()
            }
        }
    }
}
