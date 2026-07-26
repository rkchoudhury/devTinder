package com.example.devtinder.ui.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.devtinder.R

@Composable
fun TextInput(
    label: String,
    isPasswordInput: Boolean = false,
    keyboardType: KeyboardType = KeyboardType.Text
) {
    val text = remember { mutableStateOf("") }
    val isFocused = remember { mutableStateOf(false) }
    var isPasswordVisible by remember { mutableStateOf(false) }

    TextField(
        value = text.value,
        onValueChange = { text.value = it },
        label = { Text(label) },
        singleLine = true,
        maxLines = 1,
        trailingIcon = {
            if (isFocused.value) {
                val visibilityIcon =
                    if (isPasswordVisible) R.drawable.visibility_off else R.drawable.visibility_on
                Row {
                    if (isPasswordInput) {
                        IconButton(
                            onClick = { isPasswordVisible = !isPasswordVisible },
                            modifier = Modifier.size(24.dp)
                        ) {
                            Icon(
                                painter = painterResource(visibilityIcon),
                                contentDescription = "",
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }
                    IconButton(onClick = { text.value = "" }, modifier = Modifier.size(24.dp)) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "",
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }
            }
        },
        modifier = Modifier.onFocusChanged { focusState ->
            isFocused.value = focusState.isFocused
        },
        visualTransformation =
            if (isPasswordInput && !isPasswordVisible) PasswordVisualTransformation() else VisualTransformation.None,
        keyboardOptions = KeyboardOptions(keyboardType = keyboardType)

    )
    Spacer(modifier = Modifier.height(10.dp))
}

@Composable
@Preview(showSystemUi = true)
fun TextInputPreview() {
    TextInput("Email Id")
}