package com.tomatohutgo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.alibaichuan.RNAlibcSdkPackage;
import com.lmy.smartrefreshlayout.SmartRefreshLayoutPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import cn.reactnative.modules.update.UpdatePackage;
import cn.reactnative.modules.update.UpdateContext;
import com.bugly.RNBuglyPackage;
import com.bugly.RNBuglyModule;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAlibcSdkPackage(),
            new SmartRefreshLayoutPackage(),
            new RNFetchBlobPackage(),
            new UpdatePackage(),
            new RNBuglyPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    RNBuglyModule.init(this, "cda0dc27c8", true);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
