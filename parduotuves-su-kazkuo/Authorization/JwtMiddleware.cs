namespace Parduotuves.Authorization;

using Microsoft.Extensions.Options;
using Parduotuves.Helpers;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly JwtSettings _jwtSettings;

    public JwtMiddleware(RequestDelegate next, IOptions<JwtSettings> jwtSettings)
    {
        _next = next;
        _jwtSettings = jwtSettings.Value;
    }

    public async Task Invoke(HttpContext context, DataContext dataContext, IJwtUtils jwtUtils)
    {
        //var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var token = context.Request.Cookies["jwtToken"];
        var accountId = jwtUtils.ValidateJwtToken(token);
        if (accountId != null)
        {
            // attach account to context on successful jwt validation
            context.Items["Account"] = await dataContext.Accounts.FindAsync(accountId.Value);
        }

        await _next(context);
    }
}