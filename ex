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
