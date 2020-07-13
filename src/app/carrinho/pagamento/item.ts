export class Item {
    name: string;
    description: string;
    quantity: string;
    price: string;
    tax: string;
    sku: string;
    currency: string;

    static Map(items: Array<any>): Item[] {
        // tslint:disable-next-line:prefer-const
        let _items = [];

        // tslint:disable-next-line:prefer-const
        for (let element of items) {
            // tslint:disable-next-line:prefer-const
            let _item = new Item;
            _item.name = element["TituloPlano"];
            _item.description = element["DescricaoPlano"];
            _item.quantity = '1'; // element["quantity"];
            // _item.price = element["Valor"];
            _item.price = Number(element["Valor"]).toFixed(2);
            _item.tax = ''; // element["tax"];
            _item.sku = element["Uid"];
            _item.currency = 'BRL'; // element["currency"];
            _items.push(_item);
        }

        return _items;
    }

}
