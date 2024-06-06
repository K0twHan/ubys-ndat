import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }

  canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    console.log('Request:', request.cookie);  // Request'i loglayın
    console.log('Cookies:', request.cookies);  // Cookie'leri loglayın
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Token not found in cookies');
    }

    return super.canActivate(context);
  }

  extractTokenFromCookie(request: any): string | null {
    if (request && request.cookies) {
      return request.cookies['jwt'] || null;
    }
    return null;
  }
}