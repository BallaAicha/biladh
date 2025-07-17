private void logErrorWithContext(String error, HttpRequest request, RequestContext context, Exception e) {
        StringBuilder logMsg = new StringBuilder();
        logMsg.append("message: \"").append(error).append("\"");
        if (context != null) {
            // Récupération sécurisée du DIGITAL_ID
            try {
                if (context.getUser().isPresent() && context.getUser().get().getUserId() != null) {
                    logMsg.append(", DIGITAL_ID: \"").append(context.getUser().get().getUserId()).append("\"");
                }
            } catch (Exception ex) {
                // Ne rien faire si absent
            }
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
