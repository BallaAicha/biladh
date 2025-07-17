catch (IOException e) {
    error = "IO_HTTP_CLIENT_ERROR: " + ErrorUtil.unwrap(e).getMessage();

    // Récupération sécurisée des identifiants
    String digitalId = "";
    String cbsClientId = "";
    if (context != null) {
        // Récupère DIGITAL_ID si présent (exemple avec getUser() qui retourne un Optional)
        if (context.getUser() != null && context.getUser().isPresent()) {
            try {
                digitalId = String.valueOf(context.getUser().get().getUserId());
            } catch (Exception ex) {
                // Si getUserId() n'existe pas ou lève une exception, on laisse vide
            }
        }
        // Récupère CBS_CLIENT_ID si présent (exemple avec getBankingCustomerId() qui retourne un Optional)
        if (context.getBankingCustomerId() != null && context.getBankingCustomerId().isPresent()) {
            try {
                cbsClientId = String.valueOf(context.getBankingCustomerId().get());
            } catch (Exception ex) {
                // Si get() lève une exception, on laisse vide
            }
        }
    }

    // Logging robuste : on loggue les IDs seulement s'ils existent
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

    // On exploite la variable error dans le retour d'erreur
    return handleErrorCode(error, HttpStatus.INTERNAL_SERVER_ERROR);
}
