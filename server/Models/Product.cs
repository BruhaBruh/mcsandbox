using System;
using System.Collections.Generic;

using Sandbox.Types;

namespace Sandbox.Models
{
    public partial class Product
    {
        public Product()
        {
            Orders = new HashSet<Order>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? Cost { get; set; }
        public string? CostBy { get; set; }
        public int? CostStart { get; set; }
        public int? CostEnd { get; set; }
        public ProductType Type { get; set; }
        public string Image { get; set; } = null!;

        [GraphQLIgnore]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
