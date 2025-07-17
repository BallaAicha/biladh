catch (IOException e) {
    error = "IO_HTTP_CLIENT_ERROR: " + ErrorUtil.unwrap(e).getMessage();

    String digitalId = "";
    String cbsClientId = "";

    if (context != null) {
        // Récupération sécurisée de DIGITAL_ID
        try {
            digitalId = String.valueOf(context.requireUserId());
        } catch (Exception ex) {
            // Pas d'utilisateur, on laisse digitalId vide
        }
        // Récupération sécurisée de CBS_CLIENT_ID (même logique si tu as requireBankingCustomerId)
        try {
            cbsClientId = String.valueOf(context.requireBankingCustomerId());
        } catch (Exception ex) {
            // Pas de client CBS, on laisse cbsClientId vide
        }
    }

    if (!digitalId.isEmpty() || !cbsClientId.isEmpty()) {
        logger.error(
            "message: \"{}\", DIGITAL_ID: \"{}\", CBS_CLIENT_ID: \"{}\", method: {}, url: {}, stack: {}",
            error,
            digitalId,
            cbsClientId,
            request.getMethod(),
            request.getUrl().toString(),
            ExceptionUtils.getStackTrace(e)
        );
    } else {
        logger.error(
            "message: \"{}\", method: {}, url: {}, stack: {}",
            error,
            request.getMethod(),
            request.getUrl().toString(),
            ExceptionUtils.getStackTrace(e)
        );
    }

    return handleErrorCode("Communication Failure when calling Peer...", HttpStatus.INTERNAL_SERVER_ERROR);
}
