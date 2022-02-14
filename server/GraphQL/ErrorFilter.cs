using Sandbox.Exceptions;

namespace Sandbox.GraphQL
{
    public class ErrorFilter : IErrorFilter
    {
        IError IErrorFilter.OnError(IError err)
        {
            switch (err.Exception)
            {
                case DoesNotExistsException exc:
                    return ErrorBuilder.FromError(err)
                    .SetMessage(exc.Message)
                    .SetCode("DoesNotExistsException")
                    .RemoveException()
                    .ClearExtensions()
                    .ClearLocations()
                    .Build();
                case ForbiddenException exc:
                    return ErrorBuilder.FromError(err)
                    .SetMessage(exc.Message)
                    .SetCode("ForbiddenException")
                    .RemoveException()
                    .ClearExtensions()
                    .ClearLocations()
                    .Build();
                case ValidationException exc:
                    return ErrorBuilder.FromError(err)
                    .SetMessage(exc.Message)
                    .SetCode("ValidationException")
                    .RemoveException()
                    .ClearExtensions()
                    .ClearLocations()
                    .Build();
                case UserInputException exc:
                    return ErrorBuilder.FromError(err)
                    .SetMessage(exc.Message)
                    .SetCode("UserInputException")
                    .RemoveException()
                    .ClearExtensions()
                    .ClearLocations()
                    .Build();
                case IternalException exc:
                    return ErrorBuilder.FromError(err)
                    .SetMessage(exc.Message)
                    .SetCode("IternalException")
                    .RemoveException()
                    .ClearExtensions()
                    .ClearLocations()
                    .Build();
                default:
                    {
                        if (err.Code == "AUTH_NOT_AUTHENTICATED")
                        {
                            return ErrorBuilder.FromError(err)
                                .SetMessage(err.Message)
                                .SetCode("AuthException")
                                .RemoveException()
                                .ClearExtensions()
                                .ClearLocations()
                                .Build();
                        }
                        var guid = Guid.NewGuid();
                        Console.WriteLine($"[{guid}] {err.Code}:\n{err.Message}\n{err.Exception}");
                        //_logger.LogError($"[{guid}] {err.Message}");
                        return ErrorBuilder.FromError(err)
                        .SetMessage($"Непредвиденная ошибка {guid}")
                        .SetCode("UnexpectedException")
                        .RemoveException()
                        .ClearExtensions()
                        .ClearLocations()
                        .Build();
                    }
            }
        }
    }
}
