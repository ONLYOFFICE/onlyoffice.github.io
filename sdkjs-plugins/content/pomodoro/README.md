# Pomodoro Timer Plugin for ONLYOFFICE

This plugin adds a customizable Pomodoro Timer to ONLYOFFICE, helping users improve productivity through structured focus and break intervals. With configurable focus/break times and optional white noise, this plugin offers a distraction-free environment for users working within ONLYOFFICE.

## Features

- **Pomodoro Timer**: Set focus and break intervals with separate durations for both modes.
- **White Noise**: Choose from multiple white noise options, including flames, water flow, and rain, to create a calming background.
- **Customizable Times**: Configure focus and break durations according to personal preferences.
- **Notifications**: Alerts the user when focus or break time ends.
- **Localization**: Currently supports English and Simplified Chinese (zh-CN).

## Installation

1. Clone this repository or download the project as a ZIP file.
2. Extract the files and upload them to your ONLYOFFICE server’s plugin folder.
3. Enable the plugin in ONLYOFFICE.

## Usage

1. Open ONLYOFFICE and navigate to the plugins section.
2. Start the Pomodoro Timer plugin by setting your desired **Focus Time** and **Break Time** under the settings.
3. Choose a **White Noise** option to play during focus or break sessions.
4. Click "Start" to begin the timer. The timer will count down for focus time, followed by break time, repeating the cycle.
5. Notifications will alert you when the focus or break time ends.

## Customization

The plugin uses `localStorage` to save user settings:
- **Focus Time**: Length of the work period in minutes.
- **Break Time**: Length of the break period in minutes.
- **White Noise**: Choice of background sound.