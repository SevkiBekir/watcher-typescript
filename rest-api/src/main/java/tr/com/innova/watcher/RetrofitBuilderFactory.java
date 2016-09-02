package tr.com.innova.watcher;

import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

/**
 * Created by tozyurek on 12.05.2016.
 */
public class RetrofitBuilderFactory {

    public static Retrofit simpleRetrofit(String baseUrl) {
        Retrofit.Builder builder = new Retrofit
            .Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(JacksonConverterFactory.create());
        return builder.build();
    }
}
