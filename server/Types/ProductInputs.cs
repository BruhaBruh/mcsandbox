namespace Sandbox.Types
{
    public class ProductInputs
    {
        public class CreateEdit
        {
            public string Name { get; set; } = null!;
            public string Description { get; set; } = null!;
            public int? Cost { get; set; }
            public string? CostBy { get; set; }
            public int? CostStart { get; set; }
            public int? CostEnd { get; set; }
            public ProductType Type { get; set; }
            public string Image { get; set; } = null!;
        }
    }
}
