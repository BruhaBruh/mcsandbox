namespace Sandbox.Exceptions
{
    public class DoesNotExistsException : Exception
    {
        public DoesNotExistsException()
        {
        }

        public DoesNotExistsException(string message)
            : base(message)
        {
        }

        public DoesNotExistsException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
