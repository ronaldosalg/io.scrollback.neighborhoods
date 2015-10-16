import React from "react-native";
import Icon from "./icon";
import Loading from "./loading";

const {
	StyleSheet,
	View,
	Image,
	TouchableHighlight
} = React;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		right: 0,
		bottom: 0,
		padding: 8
	},
	thumbnailStyle: {
		alignItems: "flex-end",
		justifyContent: "flex-end"
	},
	iconContainerOuter: {
		height: 56,
		width: 56,
		borderRadius: 32,
		margin: 8
	},
	iconContainer: {
		alignItems: "center",
		justifyContent: "center",
		height: 56,
		width: 56,
		borderRadius: 32
	},
	iconSendContainer: {
		backgroundColor: "#ff9800"
	},
	iconCancelContainer: {
		backgroundColor: "rgba(0, 0, 0, .5)"
	},
	iconSuccessContainer: {
		backgroundColor: "#4caf50"
	},
	iconErrorContainer: {
		backgroundColor: "#f44336"
	},
	icon: {
		color: "#fff",
		fontSize: 24,
		margin: 16
	},
	iconSend: {
		color: "#000",
		opacity: 0.5,
		marginRight: 13,
		marginLeft: 19
	},
	iconWarning: {
		marginTop: 14,
		marginBottom: 18
	},
	loading: {
		position: "absolute",
		left: 2,
		top: 2,
		height: 52,
		width: 52
	},
	closeButtonContainer: {
		position: "absolute",
		top: -8,
		left: -8,
		height: 36,
		width: 36,
		borderRadius: 18
	},
	closeButton: {
		backgroundColor: "#333",
		height: 36,
		width: 36,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center"
	},
	closeIcon: {
		color: "#fff",
		fontSize: 16
	}
});

export default class ChatInput extends React.Component {
	_onClose() {
		this.props.closeUpload();
	}

	_onPress() {
		if (this.props.status === "loading") {
			this.props.cancelUpload();
		} else if (this.props.status === "idle" || this.props.status === "error") {
			this.props.startUpload();
		}
	}

	render() {
		const { uri, height, width } = this.props.imageData;

		return (
			<View {...this.props} style={[ styles.container, this.props.style ]}>
				<Image source={{ uri, height: (height / width) * 160, width: 160 }} style={styles.thumbnailStyle}>
					<TouchableHighlight
						onPress={this._onPress.bind(this)}
						underlayColor="rgba(0, 0, 0, .16)"
						style={styles.iconContainerOuter}
					>

					{(() => {
						switch (this.props.status) {
						case "idle":
							return (
								<View style={[ styles.iconContainer, styles.iconSendContainer ]}>
									<Icon name="send" style={[ styles.icon, styles.iconSend ]} />
								</View>
							);
						case "loading":
							return (
								<View style={[ styles.iconContainer, styles.iconCancelContainer ]}>
									<Icon name="close" style={styles.icon} />
									<Loading style={styles.loading} />
								</View>
							);
						case "finished":
							return (
								<View style={[ styles.iconContainer, styles.iconSuccessContainer ]}>
									<Icon name="done" style={styles.icon} />
								</View>
							);
						case "error":
							return (
								<View style={[ styles.iconContainer, styles.iconErrorContainer ]}>
									<Icon name="warning" style={[ styles.icon, styles.iconWarning ]} />
								</View>
							);
						}
					}())}
					</TouchableHighlight>
				</Image>

				<TouchableHighlight
					onPress={this._onClose.bind(this)}
					underlayColor="rgba(0, 0, 0, .16)"
					style={styles.closeButtonContainer}
				>
					<View style={styles.closeButton}>
						<Icon name="close" style={styles.closeIcon} />
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

ChatInput.propTypes = {
	imageData: React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		uri: React.PropTypes.string.isRequired,
		height: React.PropTypes.number.isRequired,
		width: React.PropTypes.number.isRequired,
		size: React.PropTypes.number.isRequired
	}).isRequired,
	status: React.PropTypes.string.isRequired,
	startUpload: React.PropTypes.func.isRequired,
	cancelUpload: React.PropTypes.func.isRequired,
	closeUpload: React.PropTypes.func.isRequired
};