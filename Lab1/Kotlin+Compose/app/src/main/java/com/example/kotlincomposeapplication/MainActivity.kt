package com.example.kotlincomposeapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.Scaffold
import androidx.compose.material3.LocalTextStyle
import androidx.compose.runtime.remember
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.graphics.Color
import com.example.kotlincomposeapplication.ui.theme.KotlinComposeApplicationTheme
import androidx.compose.material3.ButtonDefaults
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.unit.sp

//entry point
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            KotlinComposeApplicationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MainLayout(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun MainLayout(modifier: Modifier = Modifier) {
    // Column to create 3 sections
    //top column with header and image
    Column(modifier = modifier.fillMaxSize()) {
        // Header text
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF008000)),
            contentAlignment = Alignment.TopStart
        ) {
            Text(
                text = "Kotlin+compose",
                color = Color.White,
                fontSize = 24.sp,
                modifier = Modifier.padding(start = 16.dp, top = 15.dp, bottom = 15.dp),
            )
        }

        // Top section with the image
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.bild),
                contentDescription = "Top Image",
                modifier = Modifier.size(150.dp)
            )
        }

        // Middle section with buttons and email input
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(horizontal = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceEvenly // Adjust for button and input spacing
        ) {
            //Button and email function
            ButtonSection()
            EmailInputField()
        }

        // Bottom section (Empty)
        Spacer(modifier = Modifier.weight(1f))
    }
}
//Defining Button layout
@Composable
fun ButtonSection() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // First row of buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center
        ) {
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray,
                    contentColor = Color.Black
                )
            ) {
                Text(text = "BUTTON")
            }

            Spacer(modifier = Modifier.width(60.dp))

            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray,
                    contentColor = Color.Black
                )
            ) {
                Text(text = "BUTTON")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Second row of buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center
        ) {
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray,
                    contentColor = Color.Black
                )
            ) {
                Text(text = "BUTTON")
            }

            Spacer(modifier = Modifier.width(60.dp))

            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray,
                    contentColor = Color.Black
                )
            ) {
                Text(text = "BUTTON")
            }
        }
    }
}
//Defining Email input layout
@Composable
fun EmailInputField() {
    val email = remember { mutableStateOf(TextFieldValue("")) }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Static label text
        Text(
            text = "Email",
            color = Color.Gray,
            modifier = Modifier.padding(end = 8.dp)
        )

        // BasicTextField for email input
        BasicTextField(
            value = email.value,
            onValueChange = { email.value = it },
            modifier = Modifier
                .fillMaxWidth()
                .drawBehind {
                    // Underline for the input field
                    drawLine(
                        color = Color(0xFFD32F2F), // Red underline color
                        start = androidx.compose.ui.geometry.Offset(0f, size.height),
                        end = androidx.compose.ui.geometry.Offset(size.width, size.height),
                        strokeWidth = 2.dp.toPx()
                    )
                },
            singleLine = true,
            textStyle = LocalTextStyle.current.copy(color = Color.Black),
            cursorBrush = SolidColor(Color(0xFFD32F2F)) // Red cursor color
        )
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    KotlinComposeApplicationTheme {
        MainLayout()
    }
}
