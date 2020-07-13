export class FichaCredito {
  StatusAnalise: 1;
  ClienteId: 0;
  PlanoContratadoId: 0;

  Pretendente = {
    Nome: "",
    CPFCNPJ: "",
    Naturalidade: "",
    LocalResidencia: "",
    UFResidencia: "",
    LocalTrabalho: "",
    UFTrabalho: "",
    Cidade: "",
    UF: "",
    TipoPretendente: 1,
    NaturezaPessoa: 1,
    DDD1: "",
    Telefone1: "",
    DDD2: "",
    Telefone2: "",
    Contatos: [
      {
        DDD: "",
        Numero: ""
      }
    ]
  };

  Proprietario = {
    Nome: "",
    CPFCNPJ: "",
    Enderecos: [
      {
        Logradouro: "",
        Numero: null,
        Complemento: "",
        Bairro: "",
        Cidade: "",
        Estado: "",
        CEP: ""
      }
    ]
  };
}
