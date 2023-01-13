import { AuthService } from "@modules/auth/services/auth.service";
import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";

export class SocketAdapter extends IoAdapter {
  private authService: AuthService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.authService = this.app.get(AuthService);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);

    server.use(async (socket: any, next) => {
      const tokenPayload: string = socket.handshake?.auth?.token;

      if (tokenPayload) {
        const [method, token] = tokenPayload.split(" ");

        if (method !== "Bearer") {
          return next(
            new Error(
              "Invalid authentication method. Only Bearer is supported.",
            ),
          );
        }

        socket.user = null;

        const user = await this.authService.authenticateToken(token);
        socket.user = user ? user.userID : null;

        return next();
      } else {
        socket.user = null;
        return next();
      }
    });

    return server;
  }
}
