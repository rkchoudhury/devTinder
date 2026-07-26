package com.example.devtinder.presentation.signup

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun SignUpScreen() {
    Column() {
        Text(text = "Sign Up Screen")
    }
}

@Composable
@Preview(showSystemUi = true)
fun SignUpScreenPreview() {
    SignUpScreen()
}