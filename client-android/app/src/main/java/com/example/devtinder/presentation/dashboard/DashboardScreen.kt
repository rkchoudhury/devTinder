package com.example.devtinder.presentation.dashboard

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun DashboardScreen() {
    Column() {
        Text(text = "Dashboard Screen")
    }
}

@Composable
@Preview(showSystemUi = true)
fun DashboardScreenPreview() {
    DashboardScreen()
}