} catch (IOException e) {
    error = "IO_HTTP_CLIENT_ERROR: " + ErrorUtil.unwrap(e).getMessage();

    Optional<User> userOpt = context != null ? context.getUser() : Optional.empty();
    String digitalId = userOpt.map(User::getUserId).map(Object::toString).orElse("N/A");
    String cbsClientId = userOpt.flatMap(User::getBankingCustomerId).map(Object::toString).orElse("N/A");

    logger.error("message: \"{}\", DIGITAL_ID: \"{}\", CBS_CLIENT_ID: \"{}\", URL: {}, method: {}, stack: {}",
        error,
        digitalId,
        cbsClientId,
        request.getUrl(),
        request.getMethod(),
        ExceptionUtils.getStackTrace(e)
    );

    return handleErrorCode("Communication Failure when calling Peer...", HttpStatus.INTERNAL_SERVER_ERROR);
}
