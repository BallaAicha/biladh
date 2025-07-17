package com.org.example.plateforme;

import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.net.ConnectException;
import java.util.*;

public class HttpClientExample {
    private static final Logger logger = LoggerFactory.getLogger(HttpClientExample.class);
    private OkHttpClient client = new OkHttpClient();
    // ... autres membres ...

    public HttpResponse<String> execute(final HttpRequest request, final RequestContext context) {
        final Request httpRequest = prepareRequest(request);
        final MutableValue<Integer> statusCode = new MutableValue<>(0);
        String error = null;
        String responseBody = null;

        try {
            // ... logs debug ...
            try (Response response = client.newCall(httpRequest).execute()) {
                statusCode.set(response.code());
                okhttp3.ResponseBody rbody = response.body();
                if (rbody != null) {
                    responseBody = rbody.string();
                }
                if (statusCode.get() >= 400) {
                    logger.error(String.join("\n", Arrays.asList(
                            "request.out.error",
                            String.format("request.url: %s %s", request.getMethod(), request.getUrl().toString()),
                            String.format("request.headers: %s", JsonUtil.serialize(request.getHeaders().toMap())),
                            String.format("request.body: %s", JsonUtil.serialize(request.getContent())),
                            String.format("response.status: %s", statusCode.get()),
                            String.format("response.body: %s", responseBody)
                    )));
                    throw new HttpException(response.code(), responseBody);
                } else if (logger.isDebugEnabled()) {
                    logger.debug("http.response.status: {}", statusCode.get());
                    if (responseBody != null) {
                        logger.debug(responseBody);
                    }
                }
                Map<String, String> responseHeaders = new HashMap<>();
                response.headers().names().forEach(name -> responseHeaders.put(name, response.headers().get(name)));
                return new HttpResponse<>(statusCode.get(), responseBody, responseHeaders);
            }
        } catch (ConnectException e) {
            error = "HTTP_CLIENT_CONNECT_EXCEPTION: " + ErrorUtil.unwrap(e).getMessage();
            logErrorWithContext(error, request, context, e);
            return handleErrorCode(error, HttpStatus.REQUEST_TIMEOUT);
        } catch (HttpException e) {
            error = "HTTP_CLIENT_ERROR: " + ErrorUtil.unwrap(e).getMessage();
            logErrorWithContext(error, request, context, e);
            return handleErrorCode(error, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            error = "IO_HTTP_CLIENT_ERROR: " + ErrorUtil.unwrap(e).getMessage();
            logErrorWithContext(error, request, context, e);
            return handleError("Communication Failure when calling Peer...", HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            // ... watchdogAgent ...
        }
    }

    private void logErrorWithContext(String error, HttpRequest request, RequestContext context, Exception e) {
        StringBuilder logMsg = new StringBuilder();
        logMsg.append("message: \"").append(error).append("\"");
        if (context != null) {
            context.getUserId().ifPresent(id -> logMsg.append(", DIGITAL_ID: \"").append(id).append("\""));
            // Gestion sécurisée du CBS_CLIENT_ID
            try {
                BankingCustomerId cbsId = context.requireBankingCustomerId();
                if (cbsId != null) {
                    logMsg.append(", CBS_CLIENT_ID: \"").append(cbsId).append("\"");
                }
            } catch (Exception ex) {
                // Ne rien faire si absent
            }
        }
        logMsg.append(", method: ").append(request.getMethod());
        logMsg.append(", url: ").append(request.getUrl());
        logMsg.append(", stack: ").append(ExceptionUtils.getStackTrace(e));
        logger.error(logMsg.toString());
    }

    // ... autres méthodes (prepareRequest, handleErrorCode, handleError, etc.) ...
}
