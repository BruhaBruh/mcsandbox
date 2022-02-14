namespace Sandbox.Exceptions
{
    public class IternalException : Exception
    {
        public IternalException()
        {
        }

        public IternalException(string message)
            : base(message)
        {
        }

        public IternalException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
