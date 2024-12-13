const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
let _faqs = null;
let _functions = null;
module.exports = class FaqsService extends BaseService {
  constructor({ Faqs, FaqsFunctions }) {
    super(Faqs);
    _faqs = Faqs;
    _functions = FaqsFunctions;
  }

  getTitle = catchServiceAsync(async (title) => {
    const faq = await _faqs.find({ title });
    if (!faq) {
      throw new AppError("Faq not found", 404);
    }
    return faq;
  });

  findAllFaqsFilters = catchServiceAsync(async (filters) => {
    const { query, limit, skip } = await _functions.buildFaqsSearchQuery(
      filters
    );

    const totalCount = await _faqs.countDocuments(query);
    const result = await _faqs
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return { data: { result, totalCount } };
  });
};
