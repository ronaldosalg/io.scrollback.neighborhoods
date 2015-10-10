package io.scrollback.neighborhoods;

import android.content.Context;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class HeyNeighborPackage implements ReactPackage {

    private Context mContext;

    HeyNeighborPackage(Context activityContext) {
        mContext = activityContext;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new WebSocketModule(reactContext),
                new GeolocationModule(reactContext),
                new ClipboardModule(reactContext),
                new DeviceVersionModule(reactContext),
                new IntentModule(reactContext, mContext),
                new PushNotificationModule(reactContext, mContext)
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.asList();
    }
}
