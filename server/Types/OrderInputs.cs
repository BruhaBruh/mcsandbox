namespace Sandbox.Types
{
    public class OrderInputs
    {
        public class OrderEdit
        {
            public int? Money { get; set; }
            public int? ExpiredAtInDays { get; set; }
            public string? ExecutorId { get; set; }
            public OrderStatus? Status { get; set; }
        }
    }
}
