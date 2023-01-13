import { AuthService } from "@modules/auth/services/auth.service";
import { UserService } from "@modules/user/services/user.service";
import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";

export class SocketAdapter extends IoAdapter {
  private authService: AuthService;
  private userService: UserService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.authService = this.app.get(AuthService);
    this.userService = this.app.get(UserService);
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
      } else {
        socket.user = null;
      }

      socket.userService = this.userService;

      return next();
    });

    return server;
  }
}
