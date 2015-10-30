import { NativeModules } from "react-native";

const { AlertDialogModule } = NativeModules;

class AlertDialog {
	setTitle(title) {
		this._title = title;

		return this;
	}

	setMessage(message) {
		this._message = message;

		return this;
	}

	setPositiveButton(label, action) {
		this._positiveLabel = label;
		this._positiveAction = action;

		return this;
	}

	setNegativeButton(label, action) {
		this._negativeLabel = label;
		this._negativeAction = action;

		return this;
	}

	show() {
		AlertDialogModule.showDialog(this._title, this._message, this._positiveLabel, this._negativeLabel, result => {
			switch (result) {
			case AlertDialogModule.DIALOG_OK:
				this._positiveAction();
				break;
			case AlertDialogModule.DIALOG_CANCEL:
				this._negativeAction();
				break;
			}
		});
	}
}

export default {
	Builder() {
		return new AlertDialog();
	}
};
